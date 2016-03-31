#!/bin/sh
d="$(date +"%F")"
prefix="hkv-backup"

dbname="$prefix-$d"

if psql -lqt | cut -d \| -f 1 | grep -qw $prefix-$d; then
    echo "Database $prefix-$d already exists. You might want to do something else instead. Grab a coffee or something."
else
    echo "Creating $prefix-$d..."
    createdb hkv-backup-$d
    echo "Pulling data from heroku DATABASE to $prefix-$d..."
    heroku pg:pull DATABASE postgres://postgres:postgres@192.168.0.3/$prefix-$d
    echo "Done."
fi
