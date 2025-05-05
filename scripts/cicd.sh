#!/bin/bash
bun dev &        # Run in background
bun dbstudio:dev &  # Run in background

wait             # Wait for both to finish (optional, keeps script alive)
