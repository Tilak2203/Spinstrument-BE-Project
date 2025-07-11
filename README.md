# 🎶 Spinstrument: A Motion-Based Musical Interface

**Spinstrument** is a real-time interactive musical instrument that converts human motion and touch into musical output. Built on the ESP32 microcontroller with sensor fusion from accelerometers, gyroscopes, ultrasonic sensors, and touch pads, this project fuses engineering, creativity, and data science to explore new forms of musical expression.

Designed for intuitive use and intelligent response, Spinstrument provides a responsive platform for performing, experimenting, and analyzing motion-based audio.

---

## 🔍 Project Summary

- **Type:** Embedded + Real-time Data Streaming + Audio Synthesis
- **Built With:** ESP32, WebSocket, C++, Web Audio API
- **Primary Inputs:** Motion (MPU6050), Touch (TTP223), Distance (HC-SR04)
- **Primary Output:** Audio tones via Web Audio API
- **Mode:** Interactive, real-time musical feedback

---

## 🎯 Goals

- Translate physical gestures into musical notes
- Enable intuitive musical interaction using sensor fusion
- Create a web-based audio simulator for immediate feedback
- Introduce data science readiness for gesture recognition and analysis

---

## 🧠 Data Science View

### 🔴 Real-Time Sensor Data Acquisition
- **MPU6050** captures roll, pitch, yaw — to switch instruments
- **Ultrasonic Sensor** detects hand proximity — to control octave range
- **Touch Sensors (TTP223)** act as input triggers for musical notes

### 🟡 Feature Engineering
| Feature | Description |
|--------|-------------|
| Roll Angle | Determines active instrument (e.g., Sitar @ 0°, Piano @ 90°) |
| Distance | Classifies octave range via threshold bins |
| Touch Sensor ID | Index of activated sensor maps to musical note |

Example JSON streamed via WebSocket:
```json
{
  "roll": 90,
  "distance_cm": 16.3,
  "octave": 2,
  "sensor_id": 4,
  "timestamp": "2025-07-10T14:35:20Z"
}
