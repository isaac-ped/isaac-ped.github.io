#!/bin/python
from __future__ import print_function

# From https://stackoverflow.com/questions/4038703/converting-bibtex-files-to-html-with-python-maybe-pybtex
import sys
from pybtex.database.input import bibtex
from operator import itemgetter, attrgetter
import pprint
parser = bibtex.Parser()
bib_data = parser.parse_file(sys.argv[1])

def sort_by_year(y, x):
    return int(x[1].fields['year']) - int(y[1].fields['year'])

bib_sorted = sorted(bib_data.entries.items(), cmp=sort_by_year)

def authorize(entry):
    if 'author' not in entry:
        return
    out = []
    for word in entry['author'].split():
        out.append(word[0] if word != 'and' else word)
    entry['author'] = ' '.join(out)


for key, value in bib_sorted:
    f = value.fields
    authorize(f)
    
    def show(field, suffix, format=None):
        if field not in f:
            return

        f[field] = f[field].replace("{{",'').replace('}}','')
        if format is not None:
            print("<%s>%s</%s>%s" % (format, f[field], format, suffix),end='')
        else:
            print(f[field]+suffix,end='')

    print('<li> <p>',end='')
    show('author','.')
    show('title','.')
    print(' in ',end='')
    show('booktitle', ',', 'i')
    show('journal', ',', 'i')
    print(' (',end='')
    show('year', '', 'i')
    print('), ',end='')
    show('pages','.')
    print('</p>')



