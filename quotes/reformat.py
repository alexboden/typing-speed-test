f = open("/Users/Alex/Documents/github/typing-speed-test/quotes/listofquotes.txt", "r")
o = open("/Users/Alex/Documents/github/typing-speed-test/quotes/output.txt", "w")
count = 0

quote = ''
for line in f:
    if line == '\n':
        if not len(quote) > 250: 
            o.write('\'' + (quote.replace('\'', '\\\'') + '\'').strip(' ') + ',')
            o.write('\n')
        quote = ''
    else:
        if line.startswith('--'):
            quote += line.strip()
        else:
            quote += line.strip() + ' '
 
