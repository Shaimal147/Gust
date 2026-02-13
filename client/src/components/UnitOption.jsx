import styles from './UnitOption.module.css'

function UnitOption({ label, selected, onClick, iconSrc, divider = false }) {
  return (
    <li className={divider ? styles.divider : ""}>
        <button
          onClick={onClick}
          className={`btn ${styles.button1} d-flex justify-content-between btn-sm w-100 text-start ${
            selected ? styles.active : ""
          }`}
          aria-pressed={selected}
          type="button"
        >
          <span>{label}</span>
          {selected && <img src={iconSrc} alt="selected" width={20} />}
        </button>
    </li>
  );
}

export default UnitOption