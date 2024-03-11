const status = (start_date, end_date, start_reg_date, end_reg_date) => {
    const currentDate = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const startRegDate = new Date(start_reg_date);
    const endRegDate = new Date(end_reg_date);

    let status = 'Finished';
    if (currentDate < startRegDate) status = 'Upcoming';
    else if (startRegDate <= currentDate && currentDate < endRegDate) status = 'Open Registration';
    else if (endRegDate < currentDate && currentDate < startDate) status = 'Closed Registration';
    else if (startDate <= currentDate && currentDate < endDate) status = 'Ongoing';
    else if (endDate < currentDate) status = 'Finished';
    else status = 'Finished';

    return status;
}

module.exports = status;