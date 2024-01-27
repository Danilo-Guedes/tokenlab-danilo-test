# Use an official MongoDB runtime as a parent image
FROM mongo:latest

# Make a directory in Docker container
RUN mkdir -p /data/db

# Expose port 27017 from the container to the host
EXPOSE 27017