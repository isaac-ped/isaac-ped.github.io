import plotly.graph_objects as go
from collections import defaultdict

keys = {
    "": "",
    "i": "Icefall caves",
    "gq": "Glacier quest",
    "iq": "Icefall quest",
    "nq": "No quest",
    "fq": "Frost Quest",
    "c": "Caverns",
    "ch": "Chiltra",
    "nch": "No Chiltara",
    "g": "Gemstone!",
}


labels = list(keys.values())

end_idx = len(labels) - 1


def get_idx(key):
    if key not in keys:
        return None
    label = keys[key]
    return labels.index(label)


links = defaultdict(int)
node_weights = defaultdict(int)
for row in open("data.csv").readlines():
    row = row.strip(",\n").split(",")
    source = ""
    source_idx = 0
    for i, dest in enumerate(row):
        node_weights[source] += 1
        dest_idx = get_idx(dest)
        if dest_idx is None:
            break
        links[(source_idx, dest_idx)] += 1
        source_idx = dest_idx
        source = dest
    node_weights[source] += 1

sources, targets, values = [], [], []

for (source, target), value in links.items():
    sources.append(source)
    targets.append(target)
    values.append(value)

group_keys = [
    [""],
    ["gq", "iq", "nq", "fq"],
    ["i", "c"],
    ["ch", "nch"],
    ["g"],
]
# Forcing the x location requires forcing the y location
# (determining y location was annoying :( )
y_locs = {}
for group in group_keys:
    sizes = [node_weights[k] for k in group]
    y = 0
    for k, k_size in zip(group, sizes):
        if k not in keys:
            continue
        y_locs[keys[k]] = (y + (k_size) / 2) / sum(sizes)
        y += k_size
x_locs = {keys.get(k): i / 4 for i, group in enumerate(group_keys) for k in group}

x = [x_locs[k] for k in labels]
y = [y_locs[k] for k in labels]


fig = go.Figure(
    data=[
        go.Sankey(
            node=dict(label=labels, x=x, y=y),
            link=dict(source=sources, target=targets, value=values),
            arrangement="snap",
        )
    ]
)

fig.update_layout(
    title_text="Gibbering Gemstone Attempts",
    font_size=20,
    paper_bgcolor="black",
    font_color="white",
)
fig.write_html("gibbering.html")
