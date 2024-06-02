import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const AddNewPost = () => {
  return (
    <div className="">
      <Link to="/addnewpost"><Button>Add NewPost</Button></Link>

    </div>
  )
}

export default AddNewPost