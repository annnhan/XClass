/**
 * Created by an.han on 15/5/25.
 */

var tasks = [
    require('./object'),
    require('./class')
]

tasks.forEach(function (task) {
    task.run();
});