from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        data = request.json
        print("Form data received:")
        print(f"Name: {data.get('name')}")
        print(f"Email: {data.get('email')}")
        print(f"Message: {data.get('message')}")
        
        # Here you would add code to email you the message,
        # for example, using smtplib.
        
        return jsonify({"status": "success", "message": "Message sent successfully!"})

if __name__ == '__main__':
    app.run(debug=True)