# gcp-black-friday-analytics
Analyze y tweets with a Serverless Data Processing pipeline on Google Cloud Platform.

The architecture consists of:
- a Google App Engine node.js service to read Twitter and push tweets to PubSub;
- a Google Cloud Pub/Sub topic;
- a Google Cloud Dataflow pipeline that reads from the Pub/Sub topic and uses the Natural Language API to retrieve the sentiment of each tweet;
- a Google BigQuery dataset containing two tables, respectively for "raw" and "annotated" tweets.

## Setup
The repository contains a bash script that automates most of the work. However, there is still something you have to do yourself:

- Create a new Google Cloud Platform project (see https://support.google.com/cloud/answer/6251787?hl=en for instructions).
- Enable the Natural Language API from the Cloud Console (https://console.cloud.google.com/apis/api/language.googleapis.com/overview).
- Open Google Cloud Shell.
- Within Cloud Shell, clone the Git Repository: `git clone https://github.com/yuriatgoogle/twitter-ml-analytics.git`.
- Set the Google Cloud Platform zone: `gcloud config set compute/zone <COMPUTE_ZONE>` (replace `<COMPUTE_ZONE>` with your preferred zone. You can list the available zones with `gcloud compute zones list`).
- Create a GCS bucket as a staging location for Dataflow deployment `gsutil mb -l <LOCATION> gs://gcp-black-friday-analytics-staging` (replace `<LOCATION>` with your preferred location. Available choices are `US`, `EU` or `ASIA`. Choose the location depending on the compute zone you previously selected.
- Replace all occurrences of `<YOUR_PROJECT_ID>` with your actual Project ID within the Yaml file. 
- [Create a Twitter application](https://apps.twitter.com/app/new) and paste the required information in the twitter-ml-analytics/k8s-twitter-to-pubsub/twitter-stream.yaml file. Use your preferred text editor, like `vi` or `nano`: `nano gcp-black-friday-analytics/k8s-twitter-to-pubsub/twitter-stream.yaml`
- launch the start.sh file to provision and start the processing pipeline: `bash twitter-ml-analytics/start.sh`.

## Credits
Repo forked from https://github.com/LorenzoRidiNoovle/gcp-black-friday-analytics

