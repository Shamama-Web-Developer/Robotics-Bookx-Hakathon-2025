---
sidebar_label: 'Modeling the Humanoid Body with URDF'
sidebar_position: 4
---

# Modeling the Humanoid Body with URDF

## Purpose of URDF in Humanoid Robotics

URDF (Unified Robot Description Format) is an XML-based format used to describe robots in ROS. For humanoid robots, URDF serves several critical purposes:

- **Physical representation**: Describes the robot's physical structure, including links, joints, and inertial properties
- **Simulation preparation**: Provides the information needed for physics simulation in tools like Gazebo
- **Visualization**: Enables 3D visualization of the robot in tools like RViz
- **Kinematics**: Enables kinematic computations for motion planning and control

## Links, Joints, and Coordinate Frames

### Links

A link represents a rigid part of the robot. In humanoid robots, typical links include:

- **Torso**: The main body of the robot
- **Head**: Contains cameras and other sensors
- **Arms**: Upper arm, lower arm, and hand components
- **Legs**: Thigh, shank, and foot components
- **End effectors**: Hands, feet, or specialized tools

Each link has properties including:

- **Visual**: How the link appears in visualization and simulation
- **Collision**: The collision model for physics simulation
- **Inertial**: Mass, center of mass, and inertia matrix

### Joints

Joints connect links and define the allowable motion between them. Common joint types in humanoid robots:

- **Revolute joints**: Rotational joints with a single degree of freedom (e.g., elbow, knee)
- **Continuous joints**: Like revolute but with unlimited rotation (e.g., continuous rotation joints)
- **Prismatic joints**: Linear motion joints (rarely used in humanoids)
- **Fixed joints**: No motion allowed (used to attach sensors or other components)

Joint properties include:

- **Limits**: Range of motion, velocity, and effort limits
- **Origin**: Position and orientation relative to parent link
- **Axis**: Direction of motion for the joint

### Coordinate Frames

Each link has a coordinate frame that provides a reference for:

- **Position**: Where the link is located in space
- **Orientation**: How the link is oriented
- **Motion**: How the link moves relative to its parent

These frames are essential for kinematic computations and sensor integration.

## Visual vs Collision Models

### Visual Models

Visual models define how the robot appears in visualization tools:

- **Geometry**: Shape of the visual component (box, cylinder, sphere, or mesh)
- **Material**: Color and appearance properties
- **Origin**: Position and orientation of the visual component

Visual models can use simplified geometry for better rendering performance while maintaining the overall appearance of the robot.

### Collision Models

Collision models define how the robot interacts with the environment in physics simulation:

- **Geometry**: Shape of the collision component
- **Origin**: Position and orientation of the collision component
- **Safety margins**: Additional padding for collision detection

Collision models often use simplified geometry compared to visual models for better simulation performance. In some cases, they may be more complex than visual models to ensure accurate collision detection.

## Preparing Humanoid Models for Simulation and Control

### Model Structure

A well-structured humanoid URDF model should:

- **Follow the kinematic chain**: Start from the base (usually the torso) and define all limbs
- **Use consistent naming**: Use descriptive names that clearly identify each link and joint
- **Include proper inertial properties**: Accurate mass and inertia for simulation stability
- **Define proper joint limits**: Reflect the physical limitations of the actual robot

### Example URDF Structure

```xml
<?xml version="1.0"?>
<robot name="humanoid_robot">
  <!-- Torso -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.2 0.1 0.4"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1.0"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.2 0.1 0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.2" iyz="0.0" izz="0.15"/>
    </inertial>
  </link>

  <!-- Hip joint connecting left leg -->
  <joint name="left_hip_joint" type="revolute">
    <parent link="torso"/>
    <child link="left_thigh"/>
    <origin xyz="-0.05 -0.1 -0.2" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>

  <link name="left_thigh">
    <visual>
      <geometry>
        <cylinder radius="0.05" length="0.4"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.05" length="0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="2.0"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.005"/>
    </inertial>
  </link>

  <!-- Additional links and joints for the complete humanoid model -->
</robot>
```

## How URDF Connects Software Control to Physical Structure

The URDF model serves as the bridge between software control algorithms and the physical robot:

1. **Forward kinematics**: Using joint angles from the URDF, compute the position of end effectors
2. **Inverse kinematics**: Compute required joint angles to achieve desired end effector positions
3. **Dynamics simulation**: Use inertial properties to simulate the robot's physical behavior
4. **Sensor integration**: Position sensors in the correct locations relative to robot links
5. **Motion planning**: Consider the robot's physical constraints during trajectory planning

This connection enables software controllers to understand and manipulate the physical structure of the humanoid robot effectively.

### Best Practices for URDF Development

- **Start simple**: Begin with basic geometric shapes and add complexity gradually
- **Verify dimensions**: Ensure all dimensions match the physical robot
- **Use appropriate inertial properties**: Accurate inertial properties are critical for simulation stability
- **Include transmission elements**: Define how actuators connect to joints
- **Validate the model**: Use tools like `check_urdf` to identify errors in the URDF
- **Test in simulation**: Verify that the model works correctly in a physics simulation before deploying to hardware

By properly defining the URDF for your humanoid robot, you create the foundation for effective simulation, visualization, and control of your robotic system.