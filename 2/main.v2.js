const randomLetters = () => {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
}

const width = 500, height = 50;

const svg = d3.select('#chart-area')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 -20 ${width} ${height}`);

const shuffle = () => {

    svg.selectAll('text')
        .data(randomLetters())
        .join('text')
        .attr('x', (item, index) => index * 16)
        .text((item, index) => item);
}

shuffle();

d3.interval(shuffle, 3000);