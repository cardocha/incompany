<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Categorias extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('categoria_helper');
        carregar_dependencias();
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->categoria->get_todos('descricao');
            echo json_encode($resultado_query);
        }
    }

    private function usuario_valido()
    {
        $this->form_validation->set_rules('descricao', 'Descrição', 'required');
        return $this->form_validation->run();
    }

    protected function inserir($categoria)
    {
        $id = 0;
        if ($this->usuario_valido()) {
            $id = $this->categoria->inserir($this->input->post());
        }

        echo parent::resposta_json($id > 0, "Categoria Salva.", null);
    }

    protected function remover($categoria)
    {
    }

    protected function atualizar($categoria)
    {
    }
}
