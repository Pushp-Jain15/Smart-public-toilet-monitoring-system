-- ====================================
-- SPTMS Database Setup Script (MySQL)
-- Smart Public Toilet Monitoring System
-- Run this in MySQL Workbench
-- ====================================

-- Step 1: Create the Database
CREATE DATABASE IF NOT EXISTS toilet_monitoring_db;
USE toilet_monitoring_db;

-- ====================================
-- Step 2: Create All Tables
-- ====================================

-- Table 1: Location
CREATE TABLE Location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    area_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL
);

-- Table 2: Toilet
CREATE TABLE Toilet (
    toilet_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    toilet_type VARCHAR(20) NOT NULL,
    installation_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Active',
    FOREIGN KEY (location_id) REFERENCES Location(location_id)
);

-- Table 3: Sensor
CREATE TABLE Sensor (
    sensor_id INT AUTO_INCREMENT PRIMARY KEY,
    toilet_id INT NOT NULL,
    sensor_type VARCHAR(20) NOT NULL,
    FOREIGN KEY (toilet_id) REFERENCES Toilet(toilet_id)
);

-- Table 4: Sensor_Reading
CREATE TABLE Sensor_Reading (
    reading_id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_id INT NOT NULL,
    reading_value FLOAT NOT NULL,
    reading_time DATETIME NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES Sensor(sensor_id)
);

-- Table 5: Maintenance_Staff
CREATE TABLE Maintenance_Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    Shift VARCHAR(10) NOT NULL
);

-- Table 6: Cleaning_Record
CREATE TABLE Cleaning_Record (
    clean_id INT AUTO_INCREMENT PRIMARY KEY,
    toilet_id INT NOT NULL,
    staff_id INT NOT NULL,
    cleaning_time DATETIME NOT NULL,
    remarks VARCHAR(255),
    FOREIGN KEY (toilet_id) REFERENCES Toilet(toilet_id),
    FOREIGN KEY (staff_id) REFERENCES Maintenance_Staff(staff_id)
);

-- Table 7: Alert
CREATE TABLE Alert (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    reading_id INT NOT NULL,
    toilet_id INT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    alert_time DATETIME NOT NULL,
    alert_status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (reading_id) REFERENCES Sensor_Reading(reading_id),
    FOREIGN KEY (toilet_id) REFERENCES Toilet(toilet_id)
);

-- ====================================
-- Step 3: Insert Sample Data
-- ====================================

-- Insert Locations
INSERT INTO Location (area_name, city, pincode) VALUES ('Connaught Place', 'New Delhi', '110001');
INSERT INTO Location (area_name, city, pincode) VALUES ('MG Road', 'Bangalore', '560001');
INSERT INTO Location (area_name, city, pincode) VALUES ('Marine Drive', 'Mumbai', '400002');
INSERT INTO Location (area_name, city, pincode) VALUES ('Anna Nagar', 'Chennai', '600040');
INSERT INTO Location (area_name, city, pincode) VALUES ('Salt Lake', 'Kolkata', '700091');
INSERT INTO Location (area_name, city, pincode) VALUES ('Banjara Hills', 'Hyderabad', '500034');
INSERT INTO Location (area_name, city, pincode) VALUES ('Aundh', 'Pune', '411007');
INSERT INTO Location (area_name, city, pincode) VALUES ('Vastrapur', 'Ahmedabad', '380015');

-- Insert Toilets
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (1, 'Male', '2024-01-15', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (1, 'Female', '2024-01-15', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (2, 'Unisex', '2024-02-20', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (2, 'Male', '2024-02-20', 'Under Maintenance');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (3, 'Female', '2024-03-10', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (3, 'Unisex', '2024-03-10', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (4, 'Male', '2024-04-05', 'Under Maintenance');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (4, 'Female', '2024-04-05', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (5, 'Unisex', '2024-05-18', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (5, 'Male', '2024-05-18', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (6, 'Female', '2024-06-22', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (6, 'Unisex', '2024-06-22', 'Under Maintenance');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (7, 'Male', '2024-07-30', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (7, 'Female', '2024-07-30', 'Active');
INSERT INTO Toilet (location_id, toilet_type, installation_date, status) VALUES (8, 'Unisex', '2024-08-14', 'Active');

-- Insert Sensors (3 sensors per toilet: Gas, Water, Temperature)
-- Toilet 1
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (1, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (1, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (1, 'Temperature');
-- Toilet 2
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (2, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (2, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (2, 'Temperature');
-- Toilet 3
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (3, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (3, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (3, 'Temperature');
-- Toilet 4
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (4, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (4, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (4, 'Temperature');
-- Toilet 5
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (5, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (5, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (5, 'Temperature');
-- Toilet 6
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (6, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (6, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (6, 'Temperature');
-- Toilet 7
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (7, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (7, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (7, 'Temperature');
-- Toilet 8
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (8, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (8, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (8, 'Temperature');
-- Toilet 9
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (9, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (9, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (9, 'Temperature');
-- Toilet 10
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (10, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (10, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (10, 'Temperature');
-- Toilet 11
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (11, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (11, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (11, 'Temperature');
-- Toilet 12
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (12, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (12, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (12, 'Temperature');
-- Toilet 13
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (13, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (13, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (13, 'Temperature');
-- Toilet 14
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (14, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (14, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (14, 'Temperature');
-- Toilet 15
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (15, 'Gas');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (15, 'Water');
INSERT INTO Sensor (toilet_id, sensor_type) VALUES (15, 'Temperature');

-- Insert Sensor Readings (using simple date values)
-- Gas sensor readings (normal)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (1, 320, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (1, 380, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (4, 290, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (7, 410, '2026-03-30 06:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (10, 350, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (13, 280, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (16, 390, '2026-03-30 05:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (19, 310, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (22, 445, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (25, 360, '2026-03-30 06:00:00');

-- Gas sensor readings (HIGH - above 500 threshold = ALERT)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (1, 620, '2026-03-30 09:30:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (7, 580, '2026-03-30 09:15:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (28, 550, '2026-03-30 09:40:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (34, 510, '2026-03-30 09:45:00');

-- Water sensor readings (normal)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (2, 65, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (5, 80, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (8, 55, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (11, 72, '2026-03-30 06:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (14, 90, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (17, 45, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (20, 68, '2026-03-30 05:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (23, 82, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (26, 60, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (29, 75, '2026-03-30 06:00:00');

-- Water sensor readings (LOW - below 30 threshold = ALERT)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (2, 18, '2026-03-30 09:35:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (11, 22, '2026-03-30 09:20:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (20, 15, '2026-03-30 09:50:00');

-- Temperature sensor readings (normal)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (3, 28, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (6, 30, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (9, 25, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (12, 32, '2026-03-30 06:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (15, 27, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (18, 29, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (21, 31, '2026-03-30 05:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (24, 26, '2026-03-30 08:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (27, 33, '2026-03-30 07:00:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (30, 28, '2026-03-30 06:00:00');

-- Temperature sensor readings (HIGH - above 35 threshold = ALERT)
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (3, 42, '2026-03-30 09:25:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (12, 38, '2026-03-30 09:10:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (27, 40, '2026-03-30 09:45:00');
INSERT INTO Sensor_Reading (sensor_id, reading_value, reading_time) VALUES (33, 37, '2026-03-30 09:55:00');

-- Insert Maintenance Staff
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Rajesh Kumar', '9876543210', 'Morning');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Sunil Verma', '9876543211', 'Morning');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Priya Sharma', '9876543212', 'Evening');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Amit Patel', '9876543213', 'Evening');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Manoj Singh', '9876543214', 'Night');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Deepak Gupta', '9876543215', 'Night');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Anita Devi', '9876543216', 'Morning');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Vikram Yadav', '9876543217', 'Evening');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Sanjay Mishra', '9876543218', 'Night');
INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES ('Kavita Rao', '9876543219', 'Morning');

-- Insert Cleaning Records
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (1, 1, '2026-03-30 07:00:00', 'Regular cleaning completed');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (2, 1, '2026-03-30 06:00:00', 'Deep cleaning done');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (3, 2, '2026-03-30 05:00:00', 'Floor mopping and sanitization');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (5, 3, '2026-03-30 04:00:00', 'Evening routine cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (6, 3, '2026-03-30 03:00:00', 'Cleaned and restocked supplies');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (7, 4, '2026-03-30 08:00:00', 'Maintenance area cleaned');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (8, 4, '2026-03-30 07:00:00', 'Regular cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (9, 5, '2026-03-30 01:00:00', 'Night shift cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (10, 5, '2026-03-29 23:00:00', 'Thorough sanitization');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (11, 6, '2026-03-29 22:00:00', 'Deep clean with disinfectant');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (1, 7, '2026-03-29 20:00:00', 'Morning routine');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (3, 7, '2026-03-29 18:00:00', 'All fixtures cleaned');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (5, 8, '2026-03-29 16:00:00', 'Evening deep clean');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (13, 2, '2026-03-30 02:00:00', 'Regular cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (14, 10, '2026-03-29 21:00:00', 'Morning shift cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (15, 10, '2026-03-29 19:00:00', 'Sanitization complete');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (1, 9, '2026-03-29 12:00:00', 'Night cleaning');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (6, 6, '2026-03-29 10:00:00', 'Full sanitization');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (9, 1, '2026-03-29 08:00:00', 'Morning routine');
INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (12, 3, '2026-03-29 06:00:00', 'Evening cleaning done');

-- Insert Alerts
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (11, 1, 'High Gas Level', '2026-03-30 09:30:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (12, 3, 'High Gas Level', '2026-03-30 09:15:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (13, 10, 'High Gas Level', '2026-03-30 09:40:00', 'Resolved');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (14, 12, 'High Gas Level', '2026-03-30 09:45:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (25, 1, 'Low Water Level', '2026-03-30 09:35:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (26, 4, 'Low Water Level', '2026-03-30 09:20:00', 'Resolved');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (27, 7, 'Low Water Level', '2026-03-30 09:50:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (38, 1, 'High Temperature', '2026-03-30 09:25:00', 'Resolved');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (39, 4, 'High Temperature', '2026-03-30 09:10:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (40, 9, 'High Temperature', '2026-03-30 09:45:00', 'Pending');
INSERT INTO Alert (reading_id, toilet_id, alert_type, alert_time, alert_status) VALUES (41, 11, 'High Temperature', '2026-03-30 09:55:00', 'Pending');

SELECT 'Database setup complete!' AS status;
