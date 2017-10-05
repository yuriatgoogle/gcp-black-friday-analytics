#!/bin/bash

# Deploy to GAE
gcloud app deploy

# Create a Pub/Sub topic that will collect all the tweets
gcloud beta pubsub topics create tweets

# Create the BigQuery dataset
bq mk black_friday_analytics

# Launch the Dataflow Pipeline
cd dataflow-pubsub-to-bigquery
mvn compile exec:java -Dexec.mainClass=it.noovle.dataflow.TwitterProcessor -Dexec.args="--streaming"