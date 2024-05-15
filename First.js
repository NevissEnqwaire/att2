const fs = require('fs');
const csv = require('csv-parser');
const _ = require('lodash');

function processCarsData(filePath) {
    const cars = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row['Make']) {
                cars.push(row);
            }
        })
        .on('end', () => {
            const totalCars = cars.length;
            console.log(`Количество автомобилей: ${totalCars}`);

            const averageMileage = _.round(_.meanBy(cars, 'Mileage'));
            console.log(`Средний пробег: ${averageMileage}`);

            const maxPriceCar = _.maxBy(cars, 'Price');
            console.log(`Стоимость самой дорогой машины: ${maxPriceCar.Make} ${maxPriceCar.Model}`);

            const oldestCar = _.minBy(cars, 'Year');
            console.log(`Самый старый автомобиль: ${oldestCar.Make} ${oldestCar.Model}`);

            const colorsCount = _.countBy(cars, 'Color');
            const colorsOutput = _.map(colorsCount, (count, color) => `${color}: ${count}`).join(', ');
            console.log(`Все цвета: ${colorsOutput}`);
        });
}
const filePath = process.argv[2];
processCarsData(filePath);

module.exports = processCarsData;