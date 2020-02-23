const randomLetters = () => {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
}

const svg = d3.select('#chart-area')
    .append('svg')
    .attr('width', 500)
    .attr('height', 50);

const shuffle = () => {

    svg.selectAll('text')
        .data(randomLetters())
        .join('text')
        .attr('x', (item, index) => index * 16)
        .attr('y', 20)
        .text((item, index) => item);
}

shuffle();

d3.interval(shuffle, 3000);