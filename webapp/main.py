import sys, json, numpy as np

def antoify(text):
    text = text.lower()

    text_bin = text.split(" ")
    text_bin

    for i in range(len(text_bin)):
        word = text_bin[i]
        l = len(word) # char lenght of a word
        n = np.random.randint(1,l-1) if l-1 > 1 else l-1 # total random char per word
        pos = np.random.choice(np.linspace(0,l-1, num=l), size=n)
        pos.sort()
        strq = word
        for q in pos:
            q = int(q)
            strq = strq[:q] + strq[q].upper() + strq[q+1:]
        text_bin[i] = strq

    sep = " "
    return sep.join(text_bin)

#start process
if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please enter a sentence")
    else:
        input = str(sys.argv[1])
        output = antoify(input)
        print(output)
