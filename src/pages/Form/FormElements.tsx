import {useState} from 'react' 
import Breadcrumb from '../../components/Breadcrumb';
 
import DefaultLayout from '../../layout/DefaultLayout';

const FormElements = () => {

  const [dispatchData, setDispatchData] = useState({});
  const [dataSelecionada, setDataSelecionada] = useState('');

  function Dispatch (){ 
    alert('clicou') 
  }

 
    
  
    const handleChange = (event) => {
      setDataSelecionada(event.target.value);
      alert(dataSelecionada)
    };
  
 
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dispatch" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 flex-center" >
        <div className="flex flex-col gap-9">
 
               {/* <!-- File upload --> */}
               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Inserir Imagens
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  imagem
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>


            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Mensagem Dispatch
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  placeholder="Digite a mensagem a enviar"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>



            </div>
          </div>
          </div>
          </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Agendar Dispatch
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">


              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Select date
                </label>
                <div className="relative">
                  <input
                    type="date"
                   onChange={handleChange}
                    className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

      
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
     
        
       
      


        </div>
      </div>
      <div className="mb-5 mt-5">
        <button
          onClick={Dispatch}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white  transition hover:bg-opacity-90"
        >Enviar</button>
      </div>
    </DefaultLayout>
  );
};

export default FormElements;
