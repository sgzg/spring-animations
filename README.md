Spring Animation Plugin Documentation

This plugin allows you to create realistic spring animations for HTML elements using custom attributes. It gives you control over animation parameters like duration, bounce, stiffness, damping, and mass. You can also specify which CSS properties to animate, making it flexible yet simple to use.

Features

	•	Spring Physics-Based Animations: Create smooth animations using spring dynamics with parameters such as bounce, stiffness, and damping.
	•	Customizable CSS Properties: Specify the CSS properties to animate such as color, border-color, transform, etc.
	•	Shorthand Support: Use a single data-spring attribute to configure everything in one go.
	•	Fallback to Default: Any unspecified parameters default to reasonable values, so you only need to specify what’s important.

Table of Contents

	•	Installation
	•	Usage
	•	Basic Example
	•	Shorthand Example
	•	Custom Attributes Example
	•	Custom Attributes
	•	Shorthand Format
	•	License

Installation

Option 1: Download and include in your project

	1.	Download the spring-animation.js file.
	2.	Include it in your HTML file:

<script src="path/to/spring-animation.js"></script>



Option 2: Install via npm

npm install spring-animation-plugin

Then include it in your JavaScript file:

import 'spring-animation-plugin';

Usage

The plugin uses data attributes to configure animations. You can configure the plugin through:

	1.	Shorthand in the data-spring attribute.
	2.	Separate custom attributes for more fine-grained control.

Basic Example

You can apply spring animations by simply using the data-spring attribute.

<a data-spring="duration:0.5, bounce:0.4, properties:color,border-color" 
   href="/contact" 
   class="contact-button">
   Contact Us
</a>

In this example, a spring animation will be applied to both color and border-color with a duration of 0.5 seconds and a bounce factor of 0.4.

Shorthand Example

Using the data-spring attribute, you can configure everything in one go:

<a data-spring="duration:0.6, bounce:0.3, properties:background-color,transform" 
   href="/about" 
   class="about-button">
   About Us
</a>

This will apply a spring animation to the background-color and transform properties with a duration of 0.6 seconds and a bounce value of 0.3.

Custom Attributes Example

For more control, you can specify each parameter with individual data- attributes:

<a data-spring-duration="0.45" 
   data-spring-bounce="0.5" 
   data-spring-properties="color, border-color" 
   href="/services" 
   class="services-button">
   Our Services
</a>

This example will apply a spring animation with a duration of 0.45 seconds and a bounce factor of 0.5, animating both color and border-color.

Custom Attributes

The plugin supports several custom attributes for fine-grained control over animations. You can use these in place of or alongside the shorthand.

Attribute	Description	Default Value	Example Value
data-spring-duration	Sets the duration of the spring animation in seconds	0.5	0.45
data-spring-bounce	Controls how much the animation bounces (0 = no bounce)	0.2	0.4
data-spring-mass	Sets the mass of the object in the spring system	1	1.5
data-spring-stiffness	Sets the stiffness of the spring	100	150
data-spring-damping	Controls how quickly the spring loses momentum	10	7
data-spring-properties	A comma-separated list of CSS properties to animate	transform	color, border-color, background-color
data-spring-perceptual-duration	The perceptual duration to control the feel of the animation	1	1.5

Example:

<a data-spring-duration="0.6" 
   data-spring-bounce="0.3" 
   data-spring-stiffness="150" 
   data-spring-damping="8" 
   data-spring-properties="background-color, transform" 
   href="/gallery" 
   class="gallery-button">
   See Gallery
</a>

This example applies spring dynamics with custom duration, bounce, stiffness, and damping, animating background-color and transform.

Shorthand Format

The plugin supports a shorthand data-spring attribute that lets you configure everything in a single string. The format is as follows:

data-spring="key1:value1, key2:value2, ..."

Supported Keys:

Key	Description	Example Value
duration	Duration of the animation (in seconds)	0.45
bounce	Bounce factor (0 = no bounce)	0.4
stiffness	Stiffness of the spring	150
damping	How quickly the spring loses momentum	8
mass	Mass of the object being animated	1.5
properties	CSS properties to animate	color,border-color,background-color

Example:

<a data-spring="duration:0.3, bounce:0.4, properties:color,border-color,background-color" 
   href="/gallery" 
   class="gallery-button">
   See all
</a>

In this example, the animation will apply to color, border-color, and background-color with a duration of 0.3 seconds and a bounce of 0.4.

Important Notes:

	•	No spaces: There should be no spaces around the colons (:) or commas (,).
	•	The plugin will gracefully fallback to default values for any missing parameters.

License

This plugin is licensed under the MIT License. See the LICENSE file for more details.

By following these instructions, you can add natural, spring-based animations to your HTML elements with minimal setup! Enjoy the flexibility of configuring animations through a simple, intuitive interface, or fine-tune your animations with detailed custom attributes.
