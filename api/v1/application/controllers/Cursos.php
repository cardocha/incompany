<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Cursos extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('curso_helper');
        carregar_dependencias();
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->curso->get_todos('titulo');
            echo json_encode($resultado_query);
        }
    }

    public function inscrito($usuario_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->curso->get_por_situacao($usuario_id, true);
            echo json_encode($resultado_query);
        }  
    }

    public function disponiveis($usuario_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->curso->get_por_situacao($usuario_id, false);
            echo json_encode($resultado_query);
        }  
    }

    public function lookup($id){
        $curso = $this->curso->get_por_id($id);
        $query_unidades = $this->unidade->get_por_curso_id($id);
        $unidades = [];
        foreach($query_unidades as $unidade){
              $unidade->materiais = $this->material->get_por_unidade_id($unidade->id);
              $unidades[] = $unidade;
        }
        $curso->unidades = $unidades;
        echo json_encode($curso);
    }


    public function is_concluido(){

        $dados = parent::get_dados();
        echo json_encode($this->curso->get_dados_conclusao($dados->curso_id, $dados->usuario_id));
    }
    private function valida($curso, $edicao)
    {
        $validacao = parent::get_validador($curso);
        $validacao->set_rules('titulo', 'Título', 'required');
        $validacao->set_rules('categoria_id', 'Categoria Curso', 'required');
        $validacao->set_rules('nome_tutor', 'Nome do Tutor', 'required');
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    protected function persistir($curso)
    {
        $id = 0;
        $validacao = $this->valida((array) $curso, false);
        $msg = "Curso Salvo.";
        
        if ($validacao) {
            $id = $this->curso->persistir((array) $curso);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null); 
    }


    public function inscrever()
    {
        $id = 0;
        $dados = parent::get_dados();
        $validacao = !empty($dados->usuario_id) && !empty($dados->curso_id);
        $msg = "Inscrição Concluída.";
        
        if ($validacao) {
            $id = $this->curso->inscrever($dados->curso_id, $dados->usuario_id );
        } else {
            $msg = "Dados inválidos para inscrição";
        }
        
        echo parent::resposta_json(true, $msg, null); 
    }

    

    protected function remover($curso)
    {
        $id = 0;
        $msg = "Curso \"".$curso->titulo."\" Removida.";

        if ($curso->id > 0) {
            $id = $this->curso->remover((array)$curso);
        } else {
            $msg = parent::get_errors();
        }

        echo parent::resposta_json($id > 0, $msg, null);
    }
}
