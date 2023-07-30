async function fetchData() {
	try {
		// Replace '/api/roles' with your actual API endpoint to fetch data
		const response = await fetch('/api/roles');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

// Function to update the chart with new data
async function updateChart() {
	const responseData = await fetchData();

	// 파이 차트 그리기
	const roleChartCanvas = document.getElementById('roleChart').getContext('2d');
	new Chart(roleChartCanvas, {
		type: 'pie',
		data: {
			labels: responseData.map(entry => entry.role),
			datasets: [{
				data: responseData.map(entry => entry.count),
				backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				datalabels: {
					display: 'auto', // Show data labels on hover
					color: '#000',
					formatter: (value, ctx) => {
						let sum = 0;
						let dataArr = ctx.chart.data.datasets[0].data;
						dataArr.map(data => {
							sum += data;
						});
						let percentage = (value * 100 / sum).toFixed(2) + "%";
						return percentage;
					},
					font: {
						weight: 'bold'
					}
				}
			}
		}
	});
}

// Call the updateChart function initially to load the chart
updateChart();










/* 막대그래프 (sectors) */
document.addEventListener("DOMContentLoaded", function() {
	fetch('/api/sector') // Assuming this URL maps to your API endpoint
		.then(response => response.json())
		.then(data => {
			const sectors = data.map(item => item.acc_sectors);
			const counts = data.map(item => item.sector_count);

			createBarChart(sectors, counts);
		})
		.catch(error => console.error('Error fetching data:', error));
});

function createBarChart(sectors, counts) {
	const ctx = document.getElementById('sectorChart').getContext('2d');

	// Define an array of colors to be used for different sectors
	const colors = [
		'rgba(75, 192, 192, 0.6)', // Color for the first sector
		'rgba(255, 99, 132, 0.6)', // Color for the second sector
		'rgba(54, 162, 235, 0.6)', // Color for the third sector
		// Add more colors for additional sectors if needed
	];

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: sectors, // Set x-axis labels to acc_sectors
			datasets: [{
				label: '숙소 개수',
				data: counts, // Set y-axis data to sector_count
				backgroundColor: colors.slice(0, sectors.length), // Use the defined colors
				borderColor: 'rgba(75, 192, 192, 1)',
			
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				datalabels: {
					anchor: 'end',
					align: 'end',
					color: 'black',
					font: {
						weight: 'bold'
					},
					formatter: function(value) {
						return value; // Show the value on top of the bars
					}
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					}
				},
				y: {
					beginAtZero: true,
					stepSize: 10, // Set the step size to 10
					title: {
						display: true,
						text: 'Sector Count' // Add y-axis title
					}
				}
			}
		}
	});
}


/* 금일 예약 통계 */
  function updateBookingCount() {
            fetch('/api/today_booking')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('todayBookingCount').innerText = data;
                })
                .catch(error => console.error('Error:', error));
        }

        // Call the function to update the booking count on page load
        updateBookingCount();

/*예약 총 매출 */
function updateBookingCount2() {
            fetch('/api/today_benefit_total')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('todayTotalmoney').innerText = data;
                })
                .catch(error => console.error('Error:', error));
        }

        // Call the function to update the booking count on page load
        updateBookingCount2();

/* 정산 통계 
function updateBookingCount3() {
            fetch('/api/today_cal')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('todayTotalcal').innerText = data;
                })
                .catch(error => console.error('Error:', error));
        }

        // Call the function to update the booking count on page load
        updateBookingCount3();

        */
	   
        /* 정산 금액 
        function updateBookingCount4() {
            fetch('/api/today_cal_price')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('todayTotalcal2').innerText = data;
                })
                .catch(error => console.error('Error:', error));
        }

        // Call the function to update the booking count on page load
        updateBookingCount4();
        */