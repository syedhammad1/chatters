<<<<<<< HEAD

# Start Zookeeper:

sudo /usr/local/zookeeper/bin/zkServer.sh restart

# brokers Id:

sudo /usr/local/zookeeper/bin/zookeeper-shell.sh localhost:2181 ls /brokers/ids

# Start Kafka Server:

sudo /usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties

# Create Topic:

sudo /usr/local/kafka/bin/kafka-topics.sh --bootstrap-server 127.0.0.1:9092 --create --replication-factor 1 --partitions 1 --topic websocketmanager

# List topic

sudo /usr/local/kafka/bin/kafka-topics.sh --bootstrap-server 127.0.0.1:9092 --list

# Describe Topic

sudo /usr/local/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic websocketmanager

# Produce a message:

sudo /usr/local/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic websocketmanager

# Consume a message:

sudo /usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic websocketmanager --from-beginning

# Consumer groups check

sudo /usr/local/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list

# Describe Consumer groups check

sudo /usr/local/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group console-consumer-12387

# Consumer with custom consumer group

sudo /usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic websocketmanager --group myConsumerGroup

# Broker list

# sudo /usr/local/kafka/bin/zookeeper-shell.sh localhost:2181 ls /brokers/ids

# Chatters application

# Technologies includes

1: Nodejs
2: PostgreSQL
3: Apache Kafka
4: Microservices
5: Docker
6: Nginx
7: Typescript

> > > > > > > 934e020dc0567140377aa8d7c23a0fd6ea3b2fb0

sudo /usr/local/kafka/bin/kafka-topics.sh --bootstrap-server 127.0.0.1:9092 -delete -topic websocketmanager1
