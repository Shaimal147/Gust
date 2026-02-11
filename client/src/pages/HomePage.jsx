import styles from './HomePage.module.css'
import gustLogo from '/images/gust-logo.png'
import gearIcon from '/images/icon-units.svg'
import searchIcon from '/images/icon-search.svg'
import sunnyIcon from '../assets/icon-sunny.webp'
import rainIcon from '../assets/icon-rain.webp'
import overcastIcon from '../assets/icon-overcast.webp'

function HomePage() {
    
    return (
        <>
            <div className="container">
                <div className='row'>
                    <div className='col-6'>
                        <div className='d-flex align-items-center gap-1  py-3'>
                            <img src={gustLogo} alt="gust logo" width={30} />
                            <p className='mb-0'>Gust</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex align-items-center justify-content-end py-3'>
                            <div className="btn-group">
                                <button className={`btn ${styles.button1} btn-sm dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={gearIcon} alt="unit settings icon" /> Units
                                </button>
                                <ul className="dropdown-menu">
                                    ...
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <div className={`d-flex justify-content-center align-items-center py-2 ${styles["generic-message"]}`}>How's the sky looking today?</div>
                    </div>
                </div>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='d-flex w-100'>
                            <form className='w-100' action="">
                                <div className={`input-group ${styles.searchbar}`}>
                                    <span className={`input-group-text ${styles.searchIconWrap}`}>
                                        <img src={searchIcon} alt="search icon" width={18} />
                                    </span>

                                    <input
                                        type="text"
                                        className={`form-control ${styles.searchInput}`}
                                        placeholder="Search for a place..."
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <div className='d-flex'>
                            <button type="button" className={`btn ${styles.button2} flex-grow-1`}>Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.overview} w-100`}>
                            <p className={`${styles["overview-title"]}`}>Berlin, Germany</p>
                            <p className={`${styles["overview-text"]}`}>Thursday, February 12, 2026</p>
                            <div className='d-flex align-items-center w-75 gap-4'>
                                <img src={sunnyIcon} alt="sunny icon" width={80} />
                                <p className='mb-0'>20<sup>°</sup></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className='row g-4'>
                    <div className='col-6'>
                        <div className={`card  ${styles["overview-details"]}`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <p className="card-text">Feels like</p>
                                <h5 className="card-title">18<sup>°</sup></h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className={`card  ${styles["overview-details"]}`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <p className="card-text">Humidity</p>
                                <h5 className="card-title">46%</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className={`card  ${styles["overview-details"]}`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <p className="card-text">Wind</p>
                                <h5 className="card-title">14 km/h</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className={`card  ${styles["overview-details"]}`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "small"}}>Precipitation</p>
                                <h5 className="card-title">0 mm</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className=''>Daily forecast</div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Tue</p>
                                    <img src={rainIcon} alt="rain icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Wed</p>
                                    <img src={overcastIcon} alt="overcast icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Thu</p>
                                    <img src={overcastIcon} alt="overcast icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Fri</p>
                                    <img src={overcastIcon} alt="overcast icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Sat</p>
                                    <img src={overcastIcon} alt="overcast icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className={`card  ${styles["overview-details"]} h-100 w-100`}>
                            <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                                <div className='d-flex flex-column align-items-center'>
                                    <p className="card-text m-0" style={{fontSize: "small"}}>Sun</p>
                                    <img src={overcastIcon} alt="overcast icon" width={50} />
                                </div>
                                <div className='d-flex justify-content-between w-100 px-1'>
                                    <p className='mb-0'>20<sup>°</sup></p>
                                    <p className='mb-0'>14<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className={`card  ${styles["hourly-details"]}`} style={{width: "18 rem"}}>
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <p className={`${styles["hourly-details"]} mb-0`}>Hourly forecast</p>
                                <div className="btn-group">
                                    <button className={`btn ${styles.button3} btn-sm dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Tuesday
                                    </button>
                                    <ul className="dropdown-menu">
                                        ...
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className={`card  ${styles["overview-details"]} mt-3 mb-3`} style={{width: "18 rem"}}>
                            <div className="card-body">
                                <div className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`} style={{width: "18 rem"}}>
                                    <div className="d-flex align-items-center">
                                        <img src={sunnyIcon} alt="sunny icon" width={50} />
                                        <p className="card-text m-0">3 PM</p>
                                    </div>
                                    <p className='m-0'>20<sup>°</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage