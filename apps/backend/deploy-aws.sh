#!/bin/bash

# AWS Free Tier Deployment Script
# Optimized for AWS Free Tier usage

set -e

echo "Starting AWS Free Tier deployment for Queue Backend..."

# Configuration - Free Tier Optimized
AWS_REGION="us-east-1"  # Free Tier eligible region
ECR_REPOSITORY="queue-backend"
ECS_CLUSTER="queue-cluster"
ECS_SERVICE="queue-backend-service"
IMAGE_TAG=${1:-latest}

# Free Tier limits: 750 hours/month of Fargate (spot-compatible)
TASK_CPU="256"         # 0.25 vCPU (within Free Tier)
TASK_MEMORY="512"      # 0.5 GB (minimal viable)

echo "Building Docker image..."
docker build -t $ECR_REPOSITORY:$IMAGE_TAG .

echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

echo "Pushing image to ECR..."
docker tag $ECR_REPOSITORY:$IMAGE_TAG $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG

# Create or update ECS service with Free Tier settings
echo "Updating ECS service..."
aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --force-new-deployment --region $AWS_REGION || {
  echo "Service might not exist, creating new one..."
  aws ecs create-service \
    --cluster $ECS_CLUSTER \
    --service-name $ECS_SERVICE \
    --task-definition queue-backend \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxx],securityGroups=[sg-xxxx],assignPublicIp=ENABLED}" \
    --region $AWS_REGION
}

echo "Free Tier deployment completed!"
echo "Cost optimization tips:"
echo "   - Using 0.25 vCPU and 0.5 GB RAM (minimal viable)"
echo "   - Single task instance (scale manually if needed)"
echo "   - Consider using RDS Free Tier for database"
echo "Application will be available via the Application Load Balancer"
