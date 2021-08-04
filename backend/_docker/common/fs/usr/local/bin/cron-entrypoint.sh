#!/usr/bin/env bash

set -e

function set_up_cron() {
  printenv | grep -v printenv | sed 's/^\(.*\)$/export \1/g' > /usr/local/bin/cron-env.sh
  echo "SHELL=/bin/bash" > /etc/cron.d/taskiify
  echo "BASH_ENV=/usr/local/bin/cron-env.sh" >> /etc/cron.d/taskiify
  echo "* * * * * node /home/node/dist/application/scripts/create-kitchen-tidying-up.js >> /var/log/taskiify-cron-std.log 2>&1" >> /etc/cron.d/taskiify
  echo "" >> /etc/cron.d/taskiify

  crontab /etc/cron.d/taskiify
}

function build() {
if [[ ! -d node_modules ]]; then
  npm clean-install --only="${NODE_ENV}"
fi

if [[ ! -d dist ]]; then
  npm run build:ts
fi
}

build
set_up_cron

exec "$@"
