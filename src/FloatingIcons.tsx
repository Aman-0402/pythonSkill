// Python data-science and analysis logos from the open-source Devicon set (MIT), stored in public/icons/.
const tools = [
  { name: 'Pandas', file: 'pandas' },
  { name: 'Python', file: 'python' },
  { name: 'NumPy', file: 'numpy' },
  { name: 'TensorFlow', file: 'tensorflow' },
  { name: 'Matplotlib', file: 'matplotlib' },
  { name: 'scikit-learn', file: 'scikitlearn' },
  { name: 'Jupyter', file: 'jupyter' },
  { name: 'PyTorch', file: 'pytorch' },
  { name: 'Plotly', file: 'plotly' },
  { name: 'OpenCV', file: 'opencv' },
]

export default function FloatingIcons() {
  return (
    <div className="floaters" aria-hidden="true">
      {tools.map((t) => (
        <div className="floater" key={t.file}>
          <img src={`${import.meta.env.BASE_URL}icons/${t.file}.svg`} alt="" draggable={false} />
        </div>
      ))}
    </div>
  )
}
