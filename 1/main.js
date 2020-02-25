const someValues = [100, 200, 300];

const setHeight = (item, index) => `${item}px`;

d3.select('#container').selectAll('div')
    .data(someValues)
/* .join('div') */
    .join(
        enter => enter.append('div')
            .text((item, index) => `enter [${index}]`)
            .call(
                enter => enter.transition().duration(2000)
                    .style('height', setHeight)
            ),
        update => update
            .text((item, index) => `update [${index}]`)
            .call(
                update => update.transition().duration(2000)
                    .style('height', setHeight)
            ),
        exit => exit
            .text('exit...')
            .call(
                exit => exit.transition().duration(2000)
                    .remove()
            )
    );
