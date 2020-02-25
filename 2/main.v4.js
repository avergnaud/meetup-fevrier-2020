const randomLetters = () => {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
}

const g = d3.select('#chart-area')
    .append("svg")
    .attr('width', 500)
    .attr('height', 100)
    .append("g")
    .attr("transform", "translate(" + 0 + ", " + 40 + ")");

const t = 2000;

const shuffle = () => {

    g.selectAll("text")
        //tells the browser to find the svg element and look inside it for any text. If it finds text, it returns them in a selection that is an array of elements. If it doesn’t find any, it returns an empty selection, which is what will happen in this case.
        .data(randomLetters(), d => d)
        /*
        A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index. This key function is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element. The key function is then also evaluated for each new datum in data, being passed the current datum (d), the current index (i), and the group’s new data, with this as the group’s parent DOM element. The datum for a given key is assigned to the element with the matching key.
        */
        // binds data to the selection. It does this in order, so if the browser had found three text, it would link the first text to the first letter, the second to the second letter, the third one to the third letter
        // If the browser had only found two text, D3 would have put the leftover data into what’s called an enter selection
        .join(
            // The enter selection represents “missing” elements (incoming data) that you may need to create and add to the document.
            // adds a text for each item in the enter selection. In our case: adds a text for each letter in randomLetters()
            enter => enter.append("text")
                .attr("fill", "blue")
                .attr("x", (d, i) => i * 16)
                .attr("y", -30)
                .text(d => d)
                .call(
                    enter => enter.transition().duration(t)
                        .attr("y", 0)
                ),
            // The update selection represents existing elements (persisting data) that you may need to modify (for example, repositioning).
            update => update
                .attr("fill", "black")
                .attr("y", 0)
                .call(
                    update => update.transition().duration(t)
                        .attr("x", (d, i) => i * 16)
                ),
            // The exit selection represents “leftover” elements (outgoing data) that you may need to remove from the document.
            // all the exited elements are stored in some invisible place ready to be removed when the command is given. And that command is remove(). remove() will remove all the 'exited' nodes from the DOM.
            exit => exit
                .attr("fill", "brown")
                .call(
                    exit => exit.transition().duration(t)
                        .attr("y", 30)
                        .remove()
                )
        );
}

shuffle();

d3.interval(shuffle, 3000);
