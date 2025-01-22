#!/bin/bash
# Update package list and install Python
apt-get update
apt-get install -y python3 python3-pip

# Install Python dependencies
pip3 install -r requirements.txt
