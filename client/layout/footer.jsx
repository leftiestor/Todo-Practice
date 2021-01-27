
import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'LvWen'
    }
  },
  render (h) {
    return (
            <div id="footer">
                <span> Written by {this.author}</span>
            </div>
    )
  }
}
