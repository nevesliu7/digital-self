# My Digital Self Did the Walking

An interactive digital installation about the strange gap between being digitally busy and physically still.

Live project: https://digital-self-five.vercel.app/

## Project Overview

**My Digital Self Did the Walking** is a hybrid final project that combines a physical 3D-printed model with an interactive web experience.

The physical part includes a seated figure, a desk, and a computer setup. The figure stays still in front of the desk, representing the body trapped in a familiar digital work environment.

The web interface becomes the “digital layer” of the installation. It visualizes app notifications, screen time, calendar load, step count, digital pressure, vines, dust, and avatar customization. Together, the physical object and the online interface show a quiet contradiction: my digital self keeps moving, while my physical body barely moves.

## Concept

This project grew out of my Data Portrait assignment. I noticed that my calendar, phone, and apps often looked extremely active, while my body stayed almost completely still. Some days were full of interviews, applications, messages, deadlines, and screen time, but my step count was only a few hundred steps.

The project turns that contradiction into a visible and interactive scene.

The body sits still.  
The screen keeps glowing.  
The apps keep moving.  
The vines grow around the body.  
The digital self does the walking.

## Key Features

- Day-based data states based on my Data Portrait
- Interactive app notification scene
- Screen time, step count, calendar load, and pressure indicators
- Avatar customization with outfits, hairstyles, accessories, and visual tones
- X-Ray mode for reading the hidden data layer
- Notification panic game
- Collapse-and-rescue sequence with ambulance animation
- Physical 3D-printed model designed to sit beside the online interface

## Interaction Design

Users can switch between different days and see how the scene changes.

Lower step counts create more visual stillness, vines, dust, and confinement.  
Higher screen time increases digital activity and app pressure.  
Busier calendars make the monitor feel more crowded.

The avatar lab lets users customize the digital body, similar to a simplified Memoji or Snapchat-style identity system. This turns the body into something personal and editable, while still keeping it physically still in the scene.

The notification game asks users to click the correct app before time runs out. If they miss three times, the figure’s eyes turn red, the body collapses, and an ambulance rushes in. The game is intentionally exaggerated, but it reflects a real feeling of digital overload.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- 3D printing
- Vercel deployment

## Class Connection

This project connects to several themes from the course, including filter bubbles, digital overload, platform habits, online selfhood, attention, and the relationship between screen-based activity and physical experience.

Through assignments like Filter Bubble, WrongTube, the field trip, and Data Portrait, I became more aware of how digital habits shape attention, movement, and the body. This final project turns that awareness into an interactive installation.

Instead of only explaining digital overload, the project lets viewers feel it through switching days, customizing the avatar, watching pressure build, and playing the notification game.

## Course Reflection

Before this class, I often thought about digital culture through platforms, content, and audiences. This course pushed me to notice what happens around the screen: the body sitting still, the attention being pulled away, and the room becoming invisible.

My final project grew from that shift. It uses data, a physical model, and interaction to show a quiet contradiction in daily life: the digital self keeps walking, while the body stays in one place.

## How to Run Locally

```bash
npm install
npm run dev