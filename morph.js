
      // wait for less than a second
      setTimeout(function() {
  var title = 'Welcome to My Personal Website';
  var h1 = document.querySelector('h1');
  var text = h1.textContent;
  var numIterations = 2;
  var iterationCount = 0;
  var isMorphing = false;

  function morph() {
    isMorphing = true;
    for (var i = 0; i < text.length; i++) {
      if (/[0-9]/.test(text[i])) {
        setTimeout(function(index) {
          return function() {
            text = text.substr(0, index) + title[index] + text.substr(index + 1);
            h1.textContent = text;
            if (index === text.length - 1 && isMorphing) {
              setTimeout(function() {
                if (++iterationCount < numIterations) {
                  isMorphing = false;
                  for (var j = 0; j < text.length; j++) {
                    if (/[a-zA-Z]/.test(text[j])) {
                      setTimeout(function(index) {
                        return function() {
                          text = text.substr(0, index) + (Math.floor(Math.random() * 10)).toString() + text.substr(index + 1);
                          h1.textContent = text;
                          if (index === text.length - 1) {
                            morph();
                          }
                        };
                      }(j), 10 * j);
                    }
                  }
                }
              }, 12);
            }
          };
        }(i), 10 * (i - text.indexOf('0')));
      }
    }
  }

  morph();

}, 12);

