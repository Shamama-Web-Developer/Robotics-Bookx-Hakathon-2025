# Exercise: Basic Robot Drop Simulation

## Objective
Understand how gravity and physics parameters affect robot behavior in a simulated environment.

## Instructions

1. **Set up the initial scenario**:
   - Place the robot at an initial height of 5 meters above the ground
   - Set gravity to Earth's standard value (9.81 m/s²)
   - Set the robot's mass to 1.0 kg
   - Start with a flat terrain environment

2. **Run the simulation**:
   - Start the simulation and observe how the robot falls due to gravity
   - Record the time it takes for the robot to hit the ground
   - Note the velocity of the robot just before impact

3. **Experiment with different gravity values**:
   - Change gravity to 4.9 m/s² (half Earth's gravity)
   - Predict how this will change the fall time
   - Run the simulation and compare with your prediction
   - Calculate the ratio of fall times and compare with the square root of the inverse ratio of gravities

4. **Test different masses**:
   - Try different robot masses (0.5 kg, 2.0 kg, 5.0 kg)
   - Observe and record how mass affects the fall time
   - Explain why the results are what they are (Hint: think about Newton's second law)

5. **Observe collision behavior**:
   - Change the restitution value from 0.1 to 1.0 in increments of 0.2
   - For each value, note how the robot behaves upon impact with the ground
   - Explain the relationship between restitution and bounce behavior

6. **Change the terrain**:
   - Switch to the "obstacle course" terrain
   - Observe how the robot interacts with different objects
   - Adjust friction values and note how it affects the robot's movement after collision

## Expected Outcomes

After completing this exercise, you should understand:

- How gravity affects the motion of a robot
- That mass does not affect the acceleration due to gravity (in the absence of air resistance)
- How different physics parameters affect robot behavior
- The relationship between simulation parameters and real-world physics
- How collision models work in robotics simulations

## Discussion Questions

1. Why doesn't the mass of the robot affect its fall time in the simulation? How does this relate to Galileo's experiments?

2. How do the physics parameters in our simulation compare to real-world physics? What are some simplifications we've made?

3. In what ways could the physics simulation help in designing real-world robots? What are the limitations?

4. How might air resistance be incorporated into a more advanced simulation? How would this affect the results?

## Advanced Challenge

After mastering the basic simulation, try this challenge:
- Set up a scenario where the robot has to navigate through obstacles by adjusting its initial position and velocity
- Experiment with different gravity and friction values to create a stable navigation path
- Document how different parameters affect the robot's interaction with obstacles