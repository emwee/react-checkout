devserver:
	echo 'Running webpack dev server...'
	npm start; \

test: test_redux test_react

test_redux:
	echo 'Running Redux tests...'
	mocha --compilers js:babel-register test/redux/*.js; \

test_react:
	echo 'Running React tests...'
	mocha test/react/helpers/browser.js test/react/*.spec.js; \

test_react_watch:
	echo 'Watching React tests...'
	mocha -w test/react/helpers/browser.js test/react/*.spec.js; \

eslint:
	./node_modules/.bin/eslint index.js containers/ components/ actions/ reducers/ constants/ helpers/