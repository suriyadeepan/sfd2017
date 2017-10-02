import sys


template = '''
<link rel="stylesheet" href="custom.css">
<script src="js/p5.min.js"></script>
<script src="js/p5.dom.min.js"></script>
<script src="js/p5.sound.min.js"></script>
<script src="js/keymonitor.js"></script>

<script src='sketches/{}.js'></script>

<script> 
var sketchId = {}; 
var numSketches={};
</script>
'''

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(':: enter count of sketches')
        sys.exit()

    for i in range(1, int(sys.argv[1])+1):
        with open(str(i) + '.html', 'w') as f:
            content = template.format(i, i, int(sys.argv[1]))
            print(content)
            f.write(content)
