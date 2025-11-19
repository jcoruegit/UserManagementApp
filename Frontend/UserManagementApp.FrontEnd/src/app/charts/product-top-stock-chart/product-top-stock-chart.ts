import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';

Chart.register(...registerables);

@Component({
  selector: 'app-product-top-stock-chart',
  standalone: true,
  imports: [],
  templateUrl: './product-top-stock-chart.html'
})
export class ProductTopStockChartComponent implements OnInit, OnChanges {
  chart: any;
  @Input() products: any[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.loadProductChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products.length > 0) {
      const labels = this.products.map(p => p.nombre);
      const values = this.products.map(p => p.stock);
      const colors = values.map(() => this.getRandomColor());

      this.createChart(labels, values, colors);
    }
  }

  loadProductChart() {
    this.productService.getAll().subscribe(products => {
      console.log('Lista de productos: ', products);  

      const labels = products.map(p => p.nombre);
      const values = products.map(p => p.stock);
      const colors = values.map(() => this.getRandomColor());

      this.createChart(labels, values, colors);
    });
  }

  createChart(labels: string[], values: number[], colors: string[]) {

    if (this.chart) {
      this.chart.destroy();  // evita superposición y errores
    }

    this.chart = new Chart("productChart", {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Stock',
          data: values,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, //permite que el chart se adapte exactamente al tamaño del contenedor sin salirse.
        scales : {
          y:{
            min: 0, //La escala del eje Y empieza en 0
            max: 100,
            ticks:{
              stepSize: 10,  // el intervalo entre números
              callback: (value) => Number(value).toFixed(0) // sin decimales
            }
          }
        }
      }
    });
  }

  // Genera colores aleatorios vibrantes
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  }
}


