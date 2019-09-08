<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Questionarios extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('questionario_helper');
        $this->load->library('form_validation');
        $this->load->model('questao');
        $this->load->model('curso');
        $this->load->model('interacao');
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->categoria->get_todos('ordem');
            echo json_encode($resultado_query);
        }
    }

    public function nova(){
         
        $material = parent::get_dados();
        if($material){
            $questoes = $this->questao->get_por_material_id($material->id);
            $numero_proxima_questao = count($questoes) + 1;
            $enunciado_nova_questao = "Nova Questão #".$numero_proxima_questao;
            $nova_questao = array(
                "enunciado" => $enunciado_nova_questao,
                "ordem" =>    $numero_proxima_questao,
                "material_id" => $material->id
            );

            $this->persistir($nova_questao);    
        }
    }

    private function valida($material, $edicao)
    {
        $validacao = parent::get_validador($material);
        $validacao->set_rules('enunciado', 'Enunciado', 'required');
        $validacao->set_rules('ordem', 'Ordem', 'required');
        $validacao->set_rules('material_id', 'Material', 'required');
       
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    public function lookup($material_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $questoes = $this->questao->get_por_material_id($material_id);
            echo json_encode($questoes);
        }
    }

    public function responder()
    {
        $id = 0;
        $alternativas = parent::get_dados();
        $validacao = !empty($alternativas);
        $msg = "Questionário Enviado.";
        
        $qtd_alternativas = count($alternativas);
        $porcentagem_cada = 100 / $qtd_alternativas;
        $porcentagem_total = 0;
        $primeira_alternativa = $alternativas[0];
        $usuario_id = $primeira_alternativa->usuario_id;
        $material_id = $primeira_alternativa->material_id;
        $curso_id = $primeira_alternativa->curso_id;
        
        foreach($alternativas as $alternativa){
            if($alternativa->correta)
                $porcentagem_total+=$porcentagem_cada;
        }
        
        $interacao_anterior = $this->interacao->get_registro_por_material_usuario($material_id, $usuario_id, $curso_id);
        
            
        if( !$interacao_anterior ||  ( $interacao_anterior && $porcentagem_total > $interacao_anterior->percentual))
        {
            $inscricao = $this->curso->get_inscricao($usuario_id, $curso_id);
            
            if ($validacao) {
                $insercao = array(
                    "id" => !$interacao_anterior ? 0 : $interacao_anterior->id,
                    "material_id" =>  $material_id,
                    "inscricao_id" => $inscricao['id'],
                    "percentual" => $porcentagem_total
                );
                $id = $this->interacao->persistir($insercao);
            } else {
                $msg = "Dados inválidos para envio do questionário";
            }
        }
    
        echo parent::resposta_json(true, $msg, null);
    }

    protected function persistir($questao)
    {
        $id = 0;
        $validacao = $this->valida((array) $questao, false);
        $msg = "Questionário Salvo.";

        if ($validacao) {
            $id = $this->questao->persistir((array)$questao);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($questao)
    {
        $id = 0;
        $validacao = $questao->id > 0;
        $msg = "Questão Removida.";

        $this->questao->remove_todas_alternativas($questao->id);

        if ($validacao) {
            $id = $this->questao->remover((array)$questao);
        } else {
            $msg = parent::get_errors();
        }

        if ($id === FALSE)
           $msg = "Esta Questão possui alternativas vinculadas.";

        echo parent::resposta_json($id > 0, $msg, null);
    }

}
