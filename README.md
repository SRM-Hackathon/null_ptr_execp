#IPFS installation :

- npm install --save ipfs-http-client
- Running the daemon with the right port

    ipfs config Addresses.API

    (output should be /ip4/127.0.0.1/tcp/5001)

    (if not run this) : ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001

    run daemon in background : 
    
    ipfs daemon