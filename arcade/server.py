import flask
import func

app = flask.Flask(__name__)



@app.route('/', methods=['GET'])
def home():
	return "<h1>TEST</h1>"

@app.route('/api/randoword', methods=['GET'])
def api_randoword():
	# GET from C function
	words = func.generateWord()
	words = words.strip()
	response = flask.jsonify(words)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

app.run(host="192.168.33.10", port=5000, debug=False)

	