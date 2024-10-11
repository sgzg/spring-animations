

# **Spring Animations Documentation**

    

This plugin enables realistic spring animations for HTML elements using custom attributes. It offers control over animation parameters like duration, bounce, stiffness, damping, and mass. 

  

**Features**

  

•  **Spring Physics-Based Animations**: Create smooth animations using spring dynamics with parameters such as bounce, stiffness, and damping.

•  **Customizable CSS Properties**: Specify which CSS properties to animate, such as color, border-color, transform, and more.

•  **Shorthand Support**: Configure all animation parameters in a single data-spring attribute.

•  **Presets for Quick Configuration**: Use predefined animation presets for common configurations.

•  **Negative Bounce Support**: Define bounce values from -1 to 1 for a variety of spring responses.


•  **Fallback Defaults**: Unspecified parameters revert to sensible defaults, allowing you to configure only the essential elements.


  


**Installation**
---
  

**Option 1: Direct Download**

  

1.  Download the spring-animation.js file.

2.  Include the file in your HTML:

  
```
<script src="https://cdn.jsdelivr.net/gh/OZORDI/spring-animations@main/spring.js"></script>
```

  

  

  

**Option 2: Install via npm**

  

1.  Install the package using npm:

  
```
npm install @ozordi/springs  
```

  

  

2.  Import it in your JavaScript file:

  
```
import  '@ozordi/springs';
```

  

  

  

**Usage**
---
  

The plugin uses data attributes to configure animations. You can set up animations through:

  

1. **Shorthand**: Use the data-spring attribute for quick configuration.

2. **Custom Attributes**: Use individual attributes for more control.

  

**Basic Example**

  

To apply a spring animation, add the data-spring attribute to an HTML element:

  



`<div data-spring="duration:0.5, bounce:0.4, properties:color,border-color"> Example </div>`
  

This applies a spring animation to both color and border-color with a duration of 0.5 seconds and a bounce factor of 0.4.

  

**Shorthand Example**

  

Configure all parameters in the data-spring attribute:

  

`<div data-spring="duration:0.6, bounce:0.3, properties:background-color,transform" class="example"> Example </div>`

  

This animates the background-color and transform properties with a 0.6-second duration and a bounce value of 0.3.

  

**Custom Attributes Example**

  

For more precise control, use individual data-spring attributes:

  `<div data-spring-duration="0.45" data-spring-bounce="0.5" data-spring-properties="color,border-color">  Example </div>`




  

This applies a spring animation with a 0.45-second duration, 0.5 bounce, and animates color and border-color.

  

**Custom Attributes**

  

You can use individual custom attributes to fine-tune animations:

  


| Attribute                        | Description                                      | Default Value | Example Value                               |
|-----------------------------------|--------------------------------------------------|---------------|---------------------------------------------|
| `data-spring-duration`            | Sets the duration of the animation (in seconds)  | 0.5           | 0.45                                        |
| `data-spring-bounce`              | Controls the bounce intensity (0 = no bounce)    | 0.2           | 0.4                                         |
| `data-spring-mass`                | Defines the mass of the object                  | 1             | 1.5                                         |
| `data-spring-stiffness`           | Adjusts the stiffness of the spring             | 100           | 150                                         |
| `data-spring-damping`             | Regulates how quickly the spring loses momentum | 10            | 7                                           |
| `data-spring-properties`          | Comma-separated list of CSS properties to animate | `transform`   | `color,border-color,background-color`       |
| `data-spring-perceptual-duration` | Controls the perceived duration of the animation | 1             | 1.5 
| `data-spring-preset` | Apply a preset configuration for common animation styles | N/A             | `smooth`                                   


**Example with Custom Attributes**  

`<div data-spring-duration="0.6" data-spring-bounce="0.3" data-spring-stiffness="150" data-spring-damping="8" data-spring-properties="background-color,transform" class="example"> Example </div>`  

  



  

In this case, the animation uses a 0.6-second duration, 0.3 bounce, 150 stiffness, and 8 damping, affecting background-color and transform.

  

**Shorthand Format**

  

The data-spring attribute allows you to configure all settings in a single string. The format is:

  
```  
data-spring="key1:value1, key2:value2, ..."
```

  

**Supported Keys**

  

•  **duration**: Animation duration in seconds (0.45)

•  **bounce**: Bounce intensity (0.4)

•  **stiffness**: Spring stiffness (150)

•  **damping**: Momentum loss rate (8)

•  **mass**: Object’s mass (1.5)

•  **properties**: CSS properties to animate (color,border-color,background-color)

  

**Example with Shorthand**

  

`<a data-spring="duration:0.3, bounce:0.4, properties:color,border-color,background-color" href="/gallery"> Gallery </a>`


 **Presets**
--- 
The plugin includes three predefined presets for common animation styles that can be applied easily:
1. ``bouncy``: A higher bounce value for an energetic spring effect.

2. ``smooth``: A smooth deceleration without bounce.

3. ``flattened``: A slower, more deliberate motion with a negative bounce.

**Momentum Tracking**
---
  

The plugin intelligently tracks the momentum and velocity of animated elements. If the element’s size or position changes during the animation:

  

•  **Size Changes**: It detects changes in surface area (height * width) to adjust the animation accordingly.

•  **Position Changes**: It monitors the CSS transform property for any movement.

  

This ensures smooth transitions even if the target properties change mid-animation, maintaining the fluidity of the animation.

**Important Notes**
---
  

•  **No spaces**: Avoid spaces around colons (:) and commas (,).

•  The plugin falls back to default values for missing parameters.

  

**License**

  

This plugin is licensed under the MIT License. For more details, see the [LICENSE](https://github.com/OZORDI/spring-animations/blob/main/LICENSE) file.
  
