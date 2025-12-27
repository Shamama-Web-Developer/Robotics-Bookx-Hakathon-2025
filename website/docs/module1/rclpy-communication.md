---
sidebar_label: 'Communication Primitives — Nodes, Topics, and Services'
sidebar_position: 3
---

# Communication Primitives — Nodes, Topics, and Services

## ROS 2 Nodes and Lifecycle Management

A ROS 2 node is the fundamental unit of computation that performs specific tasks in a robotic system. Nodes are implemented as separate processes that can communicate with each other using ROS 2's communication primitives.

### Node Structure

A typical ROS 2 node includes:

- **Node class**: Inherits from `rclpy.node.Node`
- **Publisher/subscriber objects**: For topic-based communication
- **Service/client objects**: For request-response communication
- **Timer objects**: For periodic operations
- **Parameter declarations**: For configuration

### Lifecycle Management

ROS 2 nodes have a well-defined lifecycle including:

1. **Unconfigured state**: Node is created but not yet configured
2. **Inactive state**: Node is configured but not yet activated
3. **Active state**: Node is fully operational
4. **Finalized state**: Node is shut down

## Topics vs Services vs Actions

### Topics (Publish-Subscribe Pattern)

Topics use a publish-subscribe communication model:

- **Publishers** send messages to topics
- **Subscribers** receive messages from topics
- Communication is asynchronous and decoupled
- Multiple publishers and subscribers can connect to the same topic
- Used for streaming data (sensor readings, robot state)

### Services (Request-Response Pattern)

Services use a request-response model:

- **Clients** send requests to services
- **Servers** respond to requests from clients
- Communication is synchronous
- Request-response pairs are tightly coupled
- Used for actions that require a result (navigation goals, parameter updates)

### Actions (Goal-Oriented Communication)

Actions are used for long-running tasks:

- **Action clients** send goals to action servers
- **Action servers** execute goals and provide feedback
- Supports cancellation of goals in progress
- Used for complex operations like navigation or manipulation

## Message Types and Data Flow

ROS 2 defines standard message types for common robotic data:

- **Sensors**: `sensor_msgs` for cameras, lidars, IMUs
- **Geometry**: `geometry_msgs` for poses, transformations
- **Navigation**: `nav_msgs` for path planning and odometry
- **Robot state**: `std_msgs` for basic data types

When creating custom messages:

1. Define a `.msg` file in your package
2. Specify the data fields with appropriate types
3. Generate the message definition
4. Use the message in publishers and subscribers

## Bridging Python AI Agents to Robot Controllers using rclpy

Python is a popular choice for implementing AI agents due to its rich ecosystem of libraries for machine learning, computer vision, and scientific computing. rclpy (ROS 2 Client Library for Python) bridges Python AI agents to robot controllers.

### Basic Node Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class AIBridgeNode(Node):
    def __init__(self):
        super().__init__('ai_bridge_node')
        self.publisher = self.create_publisher(String, 'topic_name', 10)
        self.subscription = self.create_subscription(
            String,
            'input_topic',
            self.listener_callback,
            10
        )
        self.timer = self.create_timer(0.5, self.timer_callback)

    def listener_callback(self, msg):
        self.get_logger().info(f'Received: {msg.data}')

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello from AI agent'
        self.publisher.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = AIBridgeNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Publisher/Subscriber Pattern Example

A common pattern is to have:

1. **AI agent node** that subscribes to sensor data
2. **AI agent node** that publishes commands based on analysis
3. **Robot controller node** that subscribes to commands and controls hardware

This pattern allows AI agents to operate independently from real-time constraints while still effectively controlling the robot.

## Creating and Reasoning about Publisher/Subscriber Graphs

A publisher/subscriber graph visualizes the communication flow in a ROS 2 system:

```
AI Perception Node
   ↓ (sensor_data)
Data Processing Node
   ↓ (processed_data)
AI Decision Node
   ↓ (commands)
Robot Controller Node
```

When designing these graphs:

- **Minimize coupling**: Keep nodes focused on specific tasks
- **Consider data rates**: High-frequency data may strain the system
- **Plan for failure**: Design fallback behaviors when nodes fail
- **Monitor performance**: Track latency and bandwidth requirements

## Understanding How Python-based AI Logic Interacts with ROS 2

Python AI agents interact with ROS 2 through:

1. **Input pipeline**: Subscribing to sensor data and other information sources
2. **Processing**: Running AI algorithms on the data
3. **Output pipeline**: Publishing commands and other results

This interaction pattern allows AI developers to use familiar Python libraries while still participating in the ROS 2 ecosystem.

Common integration patterns include:

- **Perception modules**: Processing sensor data with computer vision libraries
- **Planning modules**: Generating trajectories with path-planning algorithms
- **Learning modules**: Training models with reinforcement learning frameworks
- **Control modules**: Implementing control algorithms for robot actuators

The rclpy library provides the bridge between these Python AI components and the ROS 2 middleware, enabling seamless integration of AI capabilities into robotic systems.