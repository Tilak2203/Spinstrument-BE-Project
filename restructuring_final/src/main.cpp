// Importing necessary libraries

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <WebSocketsServer.h>
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

// defining variables for wifi connection
const char* ssid = "Wifi name";
const char* password = "Wifi Password";
const int webSocketPort = 81; // Port for WebSocket communication

Adafruit_MPU6050 mpu;


// FOR ULTRASONIC SENSOR
const int trigPin1 = 32;
const int echoPin1 = 35;

const int trigPin2 = 16;
const int echoPin2 = 17;

//define sound speed in cm/uS
#define SOUND_SPEED 0.034

// To store distance of first ultrasonic sensor
long duration1;
int distanceCm1;
// To store distance of second ultrasonic sensor
long duration2;
int distanceCm2;

// FOR MPU6050 acclerometer and gyroscope

#define SDA_PIN 21   // Define the SDA pin (GPIO21 on ESP32)
#define SCL_PIN 22   // Define the SCL pin (GPIO22 on ESP32)


#define PRESS_DELAY 50   // Adjust this value based on your preference for press and hold duration
#define NUM_SENSORS 8

// Pins for eight ultrasonic sensor 
int touchPins[NUM_SENSORS] = {13, 12, 14, 27, 15, 26, 2, 4};

// variables for debounce logic for touch sensors
bool buttonStates[NUM_SENSORS] = {LOW};
bool lastButtonStates[NUM_SENSORS] = {LOW};
bool touchValue[NUM_SENSORS] = {LOW};
unsigned long lastDebounceTimes[NUM_SENSORS] = {0};
unsigned long lastPressTimes[NUM_SENSORS] = {0};

// websocket server intialization
AsyncWebServer webServer(80);
WebSocketsServer webSocket = WebSocketsServer(webSocketPort);

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    if (type == WStype_CONNECTED) {
        Serial.println("WebSocket client connected");
    }
}


void setup() {
    // baud rate 
    Serial.begin(115200);

    // to connect to wifi for above mentioned credentials
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi: ");
    Serial.println(WiFi.localIP());
    
    // defining gpio of touch sensor as input pins
    for (int i = 0; i < NUM_SENSORS; i++) {
        pinMode(touchPins[i], INPUT); // INPUT_PULLUP for ESP32
    }

    // starting websocket connection
    webSocket.begin();
    webSocket.onEvent(webSocketEvent);

    webServer.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(200, "text/html", "<html><body>Hello World</body></html>");
    });
    webServer.begin();
    

    pinMode(trigPin1, OUTPUT); // Sets the trigPin as an Output
    pinMode(echoPin1, INPUT); // Sets the echoPin as an Input

    pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
    pinMode(echoPin2, INPUT); // Sets the echoPin as an Input


     // FOR MPU6050

    Serial.println("Adafruit MPU6050 test!");

    Wire.begin(SDA_PIN, SCL_PIN);
    // detecting mpu6050 
    if (!mpu.begin()) {
      Serial.println("Failed to find MPU6050 chip");
      while (1) {
        delay(10);
      }
    }
    Serial.println("MPU6050 Found!");

  // It sets the accelerometer range to ±8G and prints the selected range
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    Serial.print("Accelerometer range set to: ");
    switch (mpu.getAccelerometerRange()) {
    case MPU6050_RANGE_2_G:
      Serial.println("+-2G");
      break;
    case MPU6050_RANGE_4_G:
      Serial.println("+-4G");
      break;
    case MPU6050_RANGE_8_G:
      Serial.println("+-8G");
      break;
    case MPU6050_RANGE_16_G:
      Serial.println("+-16G");
      break;
  }
  // It sets the gyro range to ±500 degrees per second (deg/s) and prints the selected range. 
    mpu.setGyroRange(MPU6050_RANGE_500_DEG);
    Serial.print("Gyro range set to: ");
    switch (mpu.getGyroRange()) {
    case MPU6050_RANGE_250_DEG:
      Serial.println("+- 250 deg/s");
      break;
    case MPU6050_RANGE_500_DEG:
      Serial.println("+- 500 deg/s");
      break;
    case MPU6050_RANGE_1000_DEG:
      Serial.println("+- 1000 deg/s");
      break;
    case MPU6050_RANGE_2000_DEG:
      Serial.println("+- 2000 deg/s");
      break;
  }
    // It sets the filter bandwidth to 5 Hz and prints the selected bandwidth.
    mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
    Serial.print("Filter bandwidth set to: ");
    switch (mpu.getFilterBandwidth()) {
    case MPU6050_BAND_260_HZ:
      Serial.println("260 Hz");
      break;
    case MPU6050_BAND_184_HZ:
      Serial.println("184 Hz");
      break;
    case MPU6050_BAND_94_HZ:
      Serial.println("94 Hz");
      break;
    case MPU6050_BAND_44_HZ:
      Serial.println("44 Hz");
      break;
    case MPU6050_BAND_21_HZ:
      Serial.println("21 Hz");
      break;
    case MPU6050_BAND_10_HZ:
      Serial.println("10 Hz");
      break;
    case MPU6050_BAND_5_HZ:
      Serial.println("5 Hz");
      break;
  }

  Serial.println("");
  delay(100);
}

void loop() {

    // starting websocket connecting in loop to trasmit readings continuously
    webSocket.loop();

    // Defining json data to pass sensor readings to frontend
    StaticJsonDocument<256> jsonDoc1;
    StaticJsonDocument<256> jsonDoc2;
    
    String jsonStr1;
    String jsonStr2;

    // FOR UNLTRASONIC SENSOR 1

      // Clears the trigPin
    digitalWrite(trigPin1, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin1, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin1, LOW);
    
    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration1 = pulseIn(echoPin1, HIGH);
    
    // Calculate the distance
    distanceCm1 = duration1 * SOUND_SPEED/2;


    // FOR UNLTRASONIC SENSOR 2

      // Clears the trigPin
    digitalWrite(trigPin2, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin2, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin2, LOW);
    
    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration2 = pulseIn(echoPin2, HIGH);
    
    // Calculate the distance
    distanceCm2 = duration2 * SOUND_SPEED/2;

    // jsonDoc1["Distance"] = distanceCm;
    // jsonDoc2["Distance"] = distanceCm;

  
// mpu

    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);


    // Calculate roll angle
    int roll = atan2(a.acceleration.y, a.acceleration.z) * 180 / M_PI;

    Serial.print("Roll: ");
    Serial.print(roll);
    Serial.println(" degrees");
    Serial.print("Distance 1: ");
    Serial.print(distanceCm1);
    Serial.println("cm");
    Serial.print("Distance 2: ");
    Serial.print(distanceCm2);
    Serial.println("cm");

    // delay(1000);

    // loop for detecting touch state of touch sensor
    for (int i = 0; i < NUM_SENSORS; i++) {
      int reading = digitalRead(touchPins[i]);

    // Debounce the button
    if (reading != lastButtonStates[i]) {
      lastDebounceTimes[i] = millis();
    }

    if (millis() - lastDebounceTimes[i] > PRESS_DELAY) {
      // Update the button state if it's been stable for a certain time
      if (reading != buttonStates[i]) {
        buttonStates[i] = reading;
        
        // Handle different press types
        if (buttonStates[i] == HIGH) {  
          // Button is pressed
            lastPressTimes[i] = millis();
            Serial.print("Sensor ");
            Serial.print(i);
            Serial.println(" pressed");

            // define json objects in both json files
            jsonDoc1["roll"] = roll;
            jsonDoc2["roll"] = roll;

            jsonDoc1["Distance1"] = distanceCm1;
            jsonDoc2["Distance1"] = distanceCm1;

            jsonDoc1["Distance2"] = distanceCm2;
            jsonDoc2["Distance2"] = distanceCm2;

            jsonDoc1["touch1"] = buttonStates[0];
            jsonDoc1["touch2"] = buttonStates[1];
            jsonDoc1["touch3"] = buttonStates[2];
            jsonDoc1["touch4"] = buttonStates[3];

            jsonDoc2["touch5"] = buttonStates[4];
            jsonDoc2["touch6"] = buttonStates[5];
            jsonDoc2["touch7"] = buttonStates[6];
            jsonDoc2["touch8"] = buttonStates[7];

            // stringify json data
            serializeJson(jsonDoc1, jsonStr1);  
            serializeJson(jsonDoc2, jsonStr2);
            // broadcast data into websocket server 
            webSocket.broadcastTXT(jsonStr1);
            webSocket.broadcastTXT(jsonStr2);

            // print json data
            Serial.print("JSON 1: ");
            Serial.println(jsonStr1);
            Serial.print("JSON 2: ");
            Serial.println(jsonStr2);
          
        } else {
          // Button is released
          unsigned long pressDuration = millis() - lastPressTimes[i];
        }
      }
    }

    // Save the current button state for comparison in the next iteration
    lastButtonStates[i] = reading;
  }
}

