# 🎵 Spinstrument: Motion-Based Musical Instrument

**Spinstrument** is a real-time, motion-driven musical interface that transforms hand gestures and touch inputs into dynamic sound using embedded sensors and web audio technologies. Designed using ESP32 and built for interactivity, Spinstrument bridges engineering, data science, and musical expression.

This repository presents the project from a **data science** perspective — focusing on real-time sensor data acquisition, feature extraction, event-driven mapping, and analytical potential.

---

## 📌 Project Overview

- **Type:** Embedded System + Data Streaming + Audio Simulation
- **Platform:** ESP32 microcontroller
- **Languages:** C++, JavaScript (WebSocket + Web Audio API) 
- **Data Input:** Accelerometer, Gyroscope, Ultrasonic Sensor, Touch Sensors
- **Output:** Musical notes via Web Audio API
- **Mode:** Real-time, interactive

---

## 🎯 Objectives

- Capture and stream real-time motion and touch data
- Convert physical gestures into audio signals
- Build a simulator using Web Audio API for sound synthesis
- Explore data science applications in sensor-driven musical interaction

---

## 📊 Data Science Perspective

### 🔴 Data Acquisition
- **MPU6050** (Accelerometer + Gyroscope): Captures 3D motion data (roll, pitch, yaw)
- **HC-SR04** (Ultrasonic): Measures distance to map octaves
- **TTP223** (Touch Sensors): Trigger note events

### 🟡 Feature Extraction
- **Roll angle** → Instrument selection (e.g., Sitar @ 0°, Piano @ 90°)
- **Ultrasonic distance** → Octave mapping (threshold-based binning)
- **Touch index + timestamp** → Note trigger with metadata

### 🟢 Event Mapping Logic
- Sensor states are evaluated in real time
- A WebSocket pipeline transmits structured JSON packets:
  ```json
  {
    "roll": 90,
    "octave": 2,
    "sensor_id": 5,
    "distance_cm": 15.4
  }

