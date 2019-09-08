<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Materiais extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('material_helper');
        $this->load->library('form_validation');
        $this->load->model('material');
        $this->load->model('curso');
        $this->load->model('interacao');
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->categoria->get_todos('titulo');
            echo json_encode($resultado_query);
        }
    }

    private function valida($material, $edicao)
    {
        $validacao = parent::get_validador($material);
        $validacao->set_rules('titulo', 'Título', 'required');
        $validacao->set_rules('tipo', 'Tipo', 'required');
        if($material['tipo'] !=='Q')
            $validacao->set_rules('url', 'url', 'required');
       
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    public function interacao(){
        
        $id = 0;
        $dados = parent::get_dados();
        $validacao = !empty($dados->usuario_id) && !empty($dados->material_id) && !empty($dados->curso_id) ;
        $msg = "Visualização registrada.";

        $inscricao = $this->curso->get_inscricao($dados->usuario_id, $dados->curso_id);
        
        if ($validacao) {
            $insercao = array(
                "material_id" => $dados->material_id,
                "inscricao_id" => $inscricao['id'],
                "percentual" => 100
            );
            $id = $this->interacao->persistir($insercao);
        } else {
            $msg = "Dados inválidos para inscrição";
        }
        
        echo parent::resposta_json(true, $msg, null); 
    }

    public function find($material_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->material->get_por_id($material_id);
            echo json_encode($resultado_query);
        }
    }

    public function possui_interacao(){
        $dados = parent::get_dados();
        $materiais = $this->material->get_por_unidade_id($dados->unidade_id);
        
        foreach($materiais as $material) {
            $material->interacao = $this->interacao->get_por_material_usuario($material->id, $dados->usuario_id, $dados->curso_id);
        }

        echo json_encode($materiais);
    }

    public function lookup($unidade_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $materiais = $this->material->get_por_unidade_id($unidade_id);
            echo json_encode($materiais);
        }
    }

    protected function persistir($material)
    {
        $id = 0;
        $validacao = $this->valida((array) $material, false);
        $msg = "Material Salvo.";

        if(!isset($material->final))
            $material->final = false;

        if ($validacao) {
            $id = $this->material->persistir((array)$material);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($material)
    {
        $id = 0;
        $validacao = $material->id > 0;
        $msg = "Material \"".$material->titulo."\" Removido.";

        if ($validacao) {
            $id = $this->material->remover((array)$material);
        } else {
            $msg = parent::get_errors();
        }

        echo parent::resposta_json($id > 0, $msg, null);
    }

}
