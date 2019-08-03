# storj_connection_tracker
track active connections for storj

The lowest tested version where the system worked properly was node v8.10, it is reccomended to use v12 due to it being newest

## Node.js installation
```
apt install curl python-software-properties
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt install nodejs -y
```

## Usage
- change the execution permissions for `track.sh` if needed
- run `./track.sh`
- alternatively, use only app.js and run `docker logs --tail 0 storagenode -f 2>&1 | node app`

## Screenshot
![Screenshot](https://user-images.githubusercontent.com/14064434/62402469-e1674580-b555-11e9-9c75-7ad09698e620.png)
