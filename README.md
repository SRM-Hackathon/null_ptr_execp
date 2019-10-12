# WILLSTONE

A decentralised platform to protect and enforce your will upon your death.

## PROBLEM

The responsibility of enforcing a will of a person normally rests in the hand of a trusted person / lawyer. He / she is trusted to make will execute untampered upon the death of a person.
Currently there exists online platforms which act as trusted source for the enforcement of a will.
These online platforms are suspectible to attack by hackers, causing tampering of will or dominance by a third party to the trusted service provider to tamper / delete the will of a person.

Moreover in Journalism, journalist carrying sensitive information often lives under fear of Death. Scams like Vyapam Scam have resulted in huge loss of life, for eg. [Vyapam Scam](https://en.wikipedia.org/wiki/Vyapam_scam). They fear whether posting their content / findings on major platforms like YouTube can also be banned by Google as it is a centralised authority.

## SOLUTION

We stored the will of a person on a blockchain making it virtually impossible to tamper with.
User would be require to acknowledge on the portal over fixed period of time to give proof of his life. When there in no proof, the system will automatically dispatch the will to appropriate authorities.
Since its stored on a distributed platform, there is no central authority having ultimate power and thus no tampering can take place.
All the information in the will be encrypted and stored in the block so no other person can see a person's will. All the information to decrypt the 'will' will be stored in a smart contract and that would decrypt the data and release when certain conditions are met.

Similarly in case of Journalist, he / she can post her evidences against a powerful authority on our platform and there will be no chance that a Powerful authority can stop the prevention of the news.

## IMPLEMENTATION

We used soldity to write smart contracts and deploy the blockchain over Ganache (Local Blockchain Setup)
To encrypt the data we would use nucypher, which is a library for key storage management over distributed systems.

## FUTURE

Once the basic layout of project is ready, we would deploy it on ethereum.
We would first implement the feature of will execution and then that of death switch.
We would add feature that, each of the user registered on the platform will have a signing key, which he or she can sign on other person's will. For eg. if a person wants a doctor and lawyer to be the witness of his will, they can sign it with their key.


## REFERENCES

[Truffle Box](https://www.trufflesuite.com/boxes/pet-shop) for base template
[Nucypher](https://github.com/nucypher/nucypher) for key storage management
