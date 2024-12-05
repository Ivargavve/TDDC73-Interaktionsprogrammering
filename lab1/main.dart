import 'package:flutter/material.dart';

// flutter run -d chrome

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Flutter App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.teal,
          title: const Row(
            children: [
              Text('Example 4: Flutter'),
            ],
          ),
          automaticallyImplyLeading: false, // Removes back arrow if present
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start, // Aligns contents to the left
            children: [
              // Center Image
              Center(
                child: Image.asset(
                  '../img.png', // Place your image in the assets folder and update path
                  width: 150,
                  height: 150,
                ),
              ),
              const SizedBox(height: 20),

              // Button Grid
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildButton("BUTTON"),
                      _buildButton("BUTTON"),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildButton("BUTTON"),
                      _buildButton("BUTTON"),
                    ],
                  ),
                ],
              ),

              // Spacing to move the email input higher up
              const SizedBox(height: 30), 

              // Email Input Field
              const Row(
                children: [
                  Text("Email", style: TextStyle(color: Colors.grey, fontSize: 16)),
                  SizedBox(width: 10),
                  Expanded(
                    child: TextField(
                      decoration: InputDecoration(
                        enabledBorder: UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.red),
                        ),
                        focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.red),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildButton(String text) {
    return ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.grey[300], // Gray background color
        foregroundColor: Colors.black,     // Black text color
        minimumSize: const Size(100, 40),        // Width and height
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(0), // No rounded corners
        ),
      ),
      child: Text(text),
    );
  }
}
