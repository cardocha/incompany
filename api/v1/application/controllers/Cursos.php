<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Cursos extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('curso_helper');
        $this->load->library('form_validation');
        $this->load->model('curso');
        $this->load->model('unidade');
        $this->load->model('material');
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
            $inscricoes = [];
            foreach($resultado_query as $curso_inscricao) {
               $curso_inscricao['dados_conclusao'] = $this->curso->get_dados_conclusao($curso_inscricao['id'], $usuario_id);
               $inscricoes[] = $curso_inscricao;  
            } 
            echo json_encode($inscricoes );
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

    public function get_avaliacao(){
        $dados = parent::get_dados();
        echo json_encode($this->curso->get_avaliacao($dados->curso_id, $dados->usuario_id));
    }

    public function is_concluido(){

        $dados = parent::get_dados();
        echo json_encode($this->curso->get_dados_conclusao($dados->curso_id, $dados->usuario_id));
    }

    public function avaliacao(){
        $dados = parent::get_dados();
        $inscricao = $this->curso->get_inscricao($dados->usuario_id, $dados->curso_id);
        if($inscricao)
            $avaliacao_anterior = $this->curso->get_registro_por_campo_valor_table("inscricao_id",$inscricao['id'],'avaliacao');
        else
            $avaliacao_anterior = false;

        $this->curso->avaliacao($inscricao, $dados->comentario, $dados->nota, $avaliacao_anterior);
        echo parent::resposta_json(true, 'Avaliação Enviada', null); 
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
