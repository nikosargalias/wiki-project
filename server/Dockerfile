# Use the official Python 3.9 image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the entire project directory to the container
COPY . .

# Make the run.sh script executable
RUN chmod +x run.sh

# Expose any necessary ports
EXPOSE 5003

# Set the entrypoint command to run the application
CMD ["./run.sh"]